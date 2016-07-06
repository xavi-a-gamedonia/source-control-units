var ranking = gamedonia.data.newEntity();

ranking.player = "player1";
ranking.mydate = new Date();
ranking.score = 400;

gamedonia.data.create(collection_name, ranking, {

    success: function(res_create) {

            response.success(res_create);
    },
    error: function(error) {

            log.error(error.message);
            response.error(error.message);
    }
});