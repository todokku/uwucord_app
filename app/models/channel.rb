# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  is_dm?     :boolean          not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
    validates :name, :server_id, presence: true
    validates :name, uniqueness: {scope: :server_id}
    validates :is_dm?, inclusion: { in: [true, false]}

    belongs_to :server
    has_many :messages

end
