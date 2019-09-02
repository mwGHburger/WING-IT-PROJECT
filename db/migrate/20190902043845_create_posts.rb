class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :content
      t.string :photo
      t.float :lng
      t.float :lat
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
