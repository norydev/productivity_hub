class Note < ApplicationRecord
  validates :name, presence: true
end
