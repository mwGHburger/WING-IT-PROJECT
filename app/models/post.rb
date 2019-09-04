class Post < ApplicationRecord
  belongs_to :user
  has_many :post_upvotes
  mount_uploader :photo, PhotoUploader

  validates :content, presence: true
end
