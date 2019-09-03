class RemoveLngFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :lng, :float
  end
end
