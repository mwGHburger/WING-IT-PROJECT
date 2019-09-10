class Post < ApplicationRecord
  DEFAULT_PHOTO_URL = ""

  acts_as_votable
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  mount_uploader :photo, PhotoUploader

  validates :content, presence: true

  def photo
    super.present? ? super : DEFAULT_PHOTO_URL
  end
end
