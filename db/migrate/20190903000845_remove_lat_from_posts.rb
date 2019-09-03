class RemoveLatFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :lat, :float
  end
end
