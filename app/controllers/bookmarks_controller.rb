class BookmarksController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @bookmark = Bookmark.new(params[:id])
    @bookmark.post = @post
    @bookmark.user = current_user

    # Checking if post's bookmarks is empty
    if @post.bookmarks.empty?
      if @bookmark.save
        redirect_to dashboard_path(current_user)
        raise
      else
        render 'posts/show'
        raise
      end
    end

    # Checking if bookmark already exists
    @post.bookmarks.each do |bookmark|
      if bookmark.user === current_user
        raise
      else
        if @bookmark.save
          redirect_to dashboard_path(current_user)
          raise
        else
          render 'posts/show'
          raise
        end
      end
    end

  end

  # def destroy
  #   @bookmark = Bookmark.find(params[:id])
  #   @bookmark.destroy
  # end

  # private

  # def bookmark_params
  #   params.require(:bookmark).permit(:post_id)
  # end
end
