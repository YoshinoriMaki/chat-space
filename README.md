# README
<!-- chatspace機能
　　　user(id email password nickname)
     chatroom(id)
     message(id text)
     image(id) -->

## usersテーブル
<!-- userは多-多の関係をchatroomと, １ー多の関係をmassageと, １ー多の関係をimageと持っている -->
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :chatrooms throgh: :users_chatrooms

## chatroomsテーブル
<!-- chatroomは多-多の関係をuserと, １ー多の関係をmassageともっている -->
|Column|Type|Options|
|------|----|-------|
|title|string|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :users throgh: :users_chatrooms

## users_chatroomsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chatroom_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatroom

## messagesテーブル
<!-- messageは １ー多の関係をuserと, １ー多の関係をchatroomと持っている -->
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|chatroom_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatroom 

