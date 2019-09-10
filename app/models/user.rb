class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  acts_as_voter
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  mount_uploader :photo, PhotoUploader
  validates :photo, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
