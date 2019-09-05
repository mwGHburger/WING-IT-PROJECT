class Post < ApplicationRecord
  acts_as_votable
  belongs_to :user
  has_many :post_upvotes
  has_many :comments, dependent: :destroy
  mount_uploader :photo, PhotoUploader

  validates :content, presence: true
end
