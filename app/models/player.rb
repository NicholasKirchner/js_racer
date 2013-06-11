class Player < ActiveRecord::Base
  # Remember to create a migration!
  validates_uniqueness_of :name
  validates :name, presence: true
  
  has_and_belongs_to_many :games
end
