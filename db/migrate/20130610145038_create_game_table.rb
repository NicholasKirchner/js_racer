class CreateGameTable < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :winner
      t.integer :time
      t.timestamps
    end
  end
end
