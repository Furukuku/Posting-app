<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index() 
    {
        $posts = Post::with('user')->limit(10)->inRandomOrder()->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'posts' => $posts,
        ]);
    }

    public function dashboard() 
    {
        $posts = Post::with('user')->where('user_id', auth()->user()->id)->latest()->orderBy('updated_at', 'desc')->get();

        return Inertia::render('Dashboard', ['posts' => $posts]);
    }

    public function update(Request $request) 
    {
        $request->validate([
            'content' => ['required', 'max:700']
        ]);

        $post = Post::find($request->id);
        $post->content = $request->content;
        $post->save();

        return to_route('dashboard');
    }

    public function delete(Request $request) 
    {
        $post = Post::find($request->id);
        $post->delete();

        return to_route('dashboard');
    }

    public function store(Request $request) 
    {
        $request->validate([
            'content' => ['required', 'max:700']
        ]);

        $post = new Post;
        $post->user_id = auth()->user()->id;
        $post->content = $request->content;
        $post->save();

        return to_route('dashboard');
    }
}
