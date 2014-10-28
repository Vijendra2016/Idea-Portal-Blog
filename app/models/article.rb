class Article < ActiveRecord::Base
  attr_accessible :text, :title
  has_many :comments, dependent: :destroy
  validates_presence_of :title 
end
