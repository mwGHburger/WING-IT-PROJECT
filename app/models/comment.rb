class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :content, presence: true
  validates :content, presence: true, length: { maximum: 280 }

end
