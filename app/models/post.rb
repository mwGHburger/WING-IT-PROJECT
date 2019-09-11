class Post < ApplicationRecord
  DEFAULT_PHOTO_URL = ""

  acts_as_votable
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  mount_uploader :photo, PhotoUploader
  validates :content, presence: true
  validates :content, presence: true, length: { maximum: 280 }

  after_create :broadcast_to_map

  def photo
    super.present? || self.new_record? ? super : DEFAULT_PHOTO_URL
  end

  private

  def broadcast_to_map
    post_marker = {
      url: "/posts/#{id}",
      user: {
        name: user.username,
        photo: {
          url: user.photo.url
        }
      },
      id: id,
      longitude: longitude,
      latitude: latitude,

      time: "just now",
      title: title,
      content: content,
      post_photo: photo.url
    }
    MapChannel.broadcast_to(0, post_marker)
  end
end
