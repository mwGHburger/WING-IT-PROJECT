class Post < ApplicationRecord
  belongs_to :user
  has_many :upvotes
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  validates :content, presence: true
end
