class CreatePlayerTable < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
    end

    add_index :players, :name, :unique => true
  end
end
