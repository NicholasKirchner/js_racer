get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/game' do
  @player1 = Player.find_or_create_by_name(params["p1"])
  @player2 = Player.find_or_create_by_name(params["p2"])
  erb :play_game, :layout => false
end

get '/game/:id' do
  @game = Game.find(params[:id].to_i)
  erb :view_game
end

post '/game' do
  p params
  game = Game.new(winner: params["winner"],
                      time: params["time"])
  game.players = params["players"].map { |name| Player.find_by_name(name) }
  game.save
  return "/game/#{game.id}"
end
