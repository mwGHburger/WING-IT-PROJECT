class Post < ApplicationRecord
  belongs_to :user
  has_many :upvotes

  validates :content, presence: true
end
