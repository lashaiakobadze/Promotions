import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Consumer } from './consumer.model';
import { CoreConfig } from '../core/config';

@Injectable({ providedIn: 'root' })
export class ConsumerService {
  private posts: Consumer[] = [];
  private postsUpdated = new Subject<{
    posts: Consumer[];
    postCount: number;
  }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private coreConfig: CoreConfig
  ) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/posts/';

    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/posts/';

    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(title: string, content: string, image: File) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/posts/';

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Consumer }>(BACKEND_URL, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/posts/';

    let postData: Consumer | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http.put(BACKEND_URL + id, postData).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/posts/';

    return this.http.delete(BACKEND_URL + postId);
  }
}
