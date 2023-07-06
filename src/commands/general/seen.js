import axios from "axios";

register('command', (playername) => {
	if (!playername) return ChatLib.chat('&8■ &7Enter a player name!')
	ChatLib.chat(new Message('&8■ &7Loading...').setChatLineId(0356))
	axios.get(`https://api.slothpixel.me/api/players/${playername}`, {
		headers: {
		  "User-Agent": "Mozilla/5.0 (ChatTriggers)"
		}
	  })
		.then(res => {
			res = res.data
			let time = new Date(res['last_logout'])

			if (res.error) return ChatLib.chat('&cFailed to fetch info via Slothpixel!')

			ChatLib.clearChat(0356)

			if (!res.username) {
				ChatLib.chat(`&4■ &7${playername} &chasn't logged onto Hypixel.`)
			} else if (!res['last_login'] && !res['last_logout']) {
				ChatLib.chat(`&4■ &7${res['rank_formatted'] + ' ' + res.username}&7 hasn't logged onto Hypixel.`)
			} else if (res.online) {
				ChatLib.chat(`&a■ ${res['rank_formatted'] + ' ' + res.username}&7 has been online for &a${timeSince(Date.now(), res['last_login']).toString().trim()}&7. They were last seen in &a${res['last_game']}&7.`)
			} else if (res['last_logout']) {
				ChatLib.chat(`&c■ ${res['rank_formatted'] + ' ' + res.username}&7 was last seen &c${time.toString().slice(0, 24)}&7. They were last seen in &c${res['last_game']}&7.`)
			} else {
				ChatLib.chat(`&4■ &7Couldn't properly return an answer!`)
			}

		})
		.catch(error => {
		  if (error.isAxiosError) {
			ChatLib.chat('&cFailed to fetch info via Axios! Does this user exist?')
			print(error.code + ": " + error.response.data);
		  } else {
			ChatLib.chat('&cFailed to fetch info! Does this user exist?')
			print(error.message);
		  }
		})
}).setName('seen', true)

function timeSince(t1, t2) {
	let secondsDiff = (t1 - t2) / 1000;
	let minutesDiff = secondsDiff / 60;
	let hoursDiff = minutesDiff / 60;
	let daysDiff = hoursDiff / 24;
	let yearsDiff = daysDiff / 365.25;

	if (secondsDiff > 60 * Math.floor(minutesDiff))
		secondsDiff -= 60 * Math.floor(minutesDiff);

	if (minutesDiff > 60 * Math.floor(hoursDiff))
		minutesDiff -= 60 * Math.floor(hoursDiff);

	if (hoursDiff > 24 * Math.floor(daysDiff))
		hoursDiff -= 24 * Math.floor(daysDiff);

	if (daysDiff > 365.25 * Math.floor(yearsDiff))
		daysDiff -= 365.25 * Math.floor(yearsDiff);


	Math.floor(secondsDiff) === 0
		? (secondsDiff = "")
		: (secondsDiff = `${Math.floor(secondsDiff)}s `);
	Math.floor(minutesDiff) === 0
		? (minutesDiff = "")
		: (minutesDiff = `${Math.floor(minutesDiff)}m `);
	Math.floor(hoursDiff) === 0
		? (hoursDiff = "")
		: (hoursDiff = `${Math.floor(hoursDiff)}h `);
	Math.floor(daysDiff) === 0
		? (daysDiff = "")
		: (daysDiff = `${Math.floor(daysDiff)}d `);
	Math.floor(yearsDiff) === 0
		? (yearsDiff = "")
		: (yearsDiff = `${Math.floor(yearsDiff)}y `);

	return yearsDiff + daysDiff + hoursDiff + minutesDiff + secondsDiff;
}