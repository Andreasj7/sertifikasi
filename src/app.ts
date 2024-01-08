import 'dotenv/config';
import 'reflect-metadata';
import createContainer from './Infrastructures/container';
import createServer from './Infrastructures/http/createServer';

const main = () => {
    const port = process.env.PORT ?? 5000;
    const container = createContainer();
    const app = createServer(container);

    app.listen(port, () =>
        console.log(`Server berjalan pada http://localhost:${port}`)
    );
};

main();
