class MapChannel < ApplicationCable::Channel
  def subscribed
    stream_for 0
  end
end
