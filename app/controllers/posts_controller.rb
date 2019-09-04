class PostsController < ApplicationController
  def new
    @post = Post.new
    @post.user = current_user
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    if @post.save
      redirect_to map_path
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :photo, :latitude, :longitude)
  end
end
