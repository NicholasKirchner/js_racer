
function playerStripLocator(player) {
    return "tr#" + player + "_strip > td";
};

function updatePlayerPosition(player, number) {
    var player_cells = playerStripLocator(player);
    $(player_cells).removeClass("active");
    $(player_cells + ":eq(" + number + ")").addClass("active");
    //$(player_cells).eq(number).addClass('active');
};

function getPlayerPosition(player) {
    var player_cells = playerStripLocator(player);
    return $(player_cells).index($(player_cells + ".active")[0]);
};

function startGame() {
    $('.results').hide()
    updatePlayerPosition("player1",1);
    updatePlayerPosition("player2",1);
    start = new Date().getTime();
    $(document).on('keyup', keyupHandler);
};

function finishGame(winner,time) {
    $(document).off('keyup');
    if (winner == "player1") {
        winner = player_1_name;
    } else {
        winner = player_2_name;
    }
    var request = $.post('/game', { winner: winner, time: time, players: [player_1_name, player_2_name] });
    request.done(function() {
        $('.results a').attr('href', request.responseText);
        $('#winner').text(winner);
        $('#time').text(time);
        $('.results').show();
    });
};

function keyupHandler(event) {
    key = event.which;
    if (key == "A".charCodeAt(0)) {
        var player = "player1";
    }
    if (key == "M".charCodeAt(0)) {
        var player = "player2";
    }
    position = getPlayerPosition(player);
    updatePlayerPosition(player, position + 1);
    if (position == 27) {
        finishGame(player, new Date().getTime() - start);
    }
};

$(document).ready(function() {
    $('button#rematch').click( function () { startGame(); });
    player_1_name = $("tr#player1_strip > td.p_name").text()
    player_2_name = $("tr#player2_strip > td.p_name").text()
    startGame();
});
