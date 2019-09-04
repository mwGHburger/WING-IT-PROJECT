class ChangeUpvotesToPostUpvotes < ActiveRecord::Migration[5.2]
  def change
    rename_table :upvotes, :post_upvotes
  end
end
