import request from 'supertest';
import app from '..';

const server = request(app);

export { server };
