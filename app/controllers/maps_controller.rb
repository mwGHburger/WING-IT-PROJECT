class MapsController < ApplicationController
  def show
    @posts = Post.all
    # @markers = @posts.map do |post|
    #   {
    #     lat: post.latitude,
    #     lng: post.longitude,
    #     infoWindow: render_to_string(partial: "posts/info_window", locals: { post: post })
    #   }
    # end
  end
end
