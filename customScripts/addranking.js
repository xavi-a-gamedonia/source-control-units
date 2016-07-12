var ranking = gamedonia.data.newEntity();

ranking.player = request.params.player;
ranking.mydate = new Date();
ranking.score = request.params.score;

gamedonia.data.create("rankings", ranking, {

    success: function(res_create) {

            response.success(res_create);
    },
    error: function(error) {

            log.error(error.message);
            response.error(error.message);
    }
});