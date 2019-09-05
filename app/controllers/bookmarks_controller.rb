class BookmarksController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @bookmark = Bookmark.new(params[:id])
    @bookmark.post = @post
    @bookmark.user = current_user
    if @bookmark.save
      redirect_to dashboard_path(current_user)
    else
      render 'posts/show'
    end
  end

  private

  # def bookmark_params
  #   params.require(:bookmark).permit(:post_id)
  # end
end
