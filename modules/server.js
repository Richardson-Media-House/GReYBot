const Kirbi = require('../kirbi');

exports.commands = [
	'server'
]

var servers = Kirbi.getJsonObject('/config/servers.json');

exports.server = {
	usage: `list|${servers.map(server => server.key).join('|')}`,
	process: (msg, suffix, isEdit, cb) => {

		if (suffix.toLowerCase() === "list" || suffix.trim() === "") {
			cb({
				embed: {
					title: `${Kirbi.Config.serverName} Servers`,
					description: servers.map(server => server.key).join('\n'),
					color: Kirbi.Config.defaultEmbedColor
				}
			}, msg);
		}
		else {
			var info = servers.filter(server => server.key === suffix.toLowerCase())[0];

			if (info) {
				cb({
					embed: {
						title: info.title,
						description: info.description,
						color: Kirbi.Config.defaultEmbedColor
					}
				}, msg);
			}
		}
	}
}