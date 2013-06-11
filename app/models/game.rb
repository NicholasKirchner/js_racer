class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_and_belongs_to_many :players

  validate :has_exactly_two_players

  def has_exactly_two_players
    if players.length != 2
      errors.add(:players, "Must have exactly two players")
    end
  end
end
