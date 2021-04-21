import { Module } from '@nestjs/common'
import { TrackModule } from './track/track.module'
import { AlbumController } from './album/album.controller'
import { AlbumService } from './album/album.service'
import { AlbumModule } from './album/album.module'
import { MongooseModule } from '@nestjs/mongoose'
import { FileModule } from './file/file.module'
import { FileService } from './file/file.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://bakhteev:323694m@cluster0.eysih.mongodb.net/music-platform?retryWrites=true&w=majority'
    ),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
})
export class AppModule {}
