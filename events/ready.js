module.exports = {
  name: 'ready',

  run: async(client) => {
    const activities = [
      "Pleasannt boş altyapı."
    ];

	setInterval(async () => {
		client.user.setPresence({ activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}` }], status: 'idle' });
	  }, 1500 * 17);
  
	  // Buraya güzel bir sistem ekledim test sunucunuzun idsini yazarak kişi sayısını ordan kaldırabilirsiniz.
	  // Yani botun durumunda o sunucuda kaç kişi varsa o kişi sayısı gözükmeyecek diğer sunucudakiler gözükecek.
	  const totalUsersExceptTestGuild = client.guilds.cache
		.filter(guild => guild.id !== '1196808396914044938') // pleasant_id kısmında test sunucunuzun idsini giriniz.
		.reduce((acc, guild) => acc + guild.memberCount, 0);
	  client.user.setPresence({ activities: [{ name: `Sunucularda ${totalUsersExceptTestGuild} kişiye hizmet ediyorum.` }], status: 'idle' });
	}
  };