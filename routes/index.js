export default function (app) {
    app.get('/', (req, reply) => {
        reply.view('index.ejs', { name: 'User' });
    });
}
