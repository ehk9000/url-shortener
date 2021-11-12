import app from './app.mjs';

app.set('port', process.env.port || 8081);
app.listen(app.get('port'), () => {
	console.log(
		`Url-Shortener Server is running ⚡️ at http://localhost:${app.get('port')}`
	);
});
