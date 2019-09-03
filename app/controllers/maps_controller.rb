class MapsController < ApplicationController
  def show
    @posts = Post.all

    @markers = @posts.map do |post|
      {
        lat: post.latitude,
        lng: post.longitude
      }
    end
  end
end
