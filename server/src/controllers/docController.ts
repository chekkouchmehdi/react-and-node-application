import { NextFunction, Request, Response } from "express";
import moment from "moment";
import PDFDocument from "pdfkit";
import qr from "qr-image";
import { DbFactory } from "../factory/db";

const ROOT_IMAGES_QR = "./public/images";

export const DocController = {
  async getDocs(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    try {
      const docs = await DbFactory.getAllDoc(username);
      return res.status(200).send(docs);
    } catch (error) {
      next(error);
    }
  },

  async getDoc(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    const { id } = req.params;
    try {
      const docs = await DbFactory.getAllDoc(username);
      const document = docs.content.find((e) => e.id === id);

      console.log(document);
      if (document) {
        let currentDate = moment().format("YYYY-MM-DD");
        let filename = `report-${currentDate}`;

        const doc = new PDFDocument();
        let stringRandomNameQr = Math.random().toString(36).substring(2);

        let getUniXStimeStamp = moment().unix();
        let prepareNameQr = `${ROOT_IMAGES_QR}/${stringRandomNameQr}-${getUniXStimeStamp}-qr.png`;
        let qr_svg = qr.image(document?.content, { type: "png" });

        let stream = qr_svg.pipe(
          require("fs").createWriteStream(prepareNameQr)
        );
        stream.on("finish", () => {
          filename = encodeURIComponent(filename) + ".pdf";

          res.setHeader(
            "Content-disposition",
            'attachment; filename="' + filename + '"'
          );
          res.setHeader("Content-type", "application/pdf");
          const content = "QR Code Harmony-technology";
          doc.y = 300;
          doc.text(content, 50, 50);

          doc.image(prepareNameQr, {
            fit: [250, 300],
            align: "center",
            valign: "center",
          });

          doc.pipe(res);
          doc.end();
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const { username, content, id } = req.body;
    try {
      const doc = {
        username,
        content: [{ content, id }],
      };
      await DbFactory.saveDoc(doc);
      return res.status(201).send({ username, content, id });
    } catch (error) {
      next(error);
    }
  },
};
