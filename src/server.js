import app from './app';

const pathsFile = process.argv.slice(2)[0];
app.loadPathsFile(pathsFile);

app.server.listen(process.env.PORT || 9000);
