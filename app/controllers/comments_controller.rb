class CommentsController < ApplicationController
  def index
    @post = Post.find(params[:post_id])
    @comments = @post.comments

    @new_comment = Comment.new()
    @new_comment.post = @post
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.new(comment_params)
    @comment.post = @post
    @comment.user = current_user
    if @comment.save
      respond_to do |format|
        format.html { redirect_to post_path(@post) }
        format.js # <-- will render `app/views/comments/create.js.erb`
      end
    else
      respond_to do |format|
        format.html { render 'posts/show' }
        format.js # <-- idem
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
