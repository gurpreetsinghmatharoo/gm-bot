module.exports = function(app, bot) {
  app.post('//presence', function (req, res) {
    let status, game;
    try {
      status = req.body.status;
      game = req.body.game;
    } catch(e) {
      res.status(400).send({
        error: 'Response error'
      });
      return;
    }

    let user = bot.user;

    if (game.length === 0) {
      game = null;
    }

    user.setPresence({
      status: status,
      game: {
        name: game
      }
    }).then(user => {
      res.send(user.presence);
    });
  });
};