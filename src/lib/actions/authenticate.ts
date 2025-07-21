// Server Action
// Server Actionは、Next.js独自の仕組みで、クライアント側のフォーム送信やボタン操作から直接サーバー上の関数を呼び出せる機能です。
// API Routeを自作する必要がなく、型安全かつシンプルにサーバー処理（データベース操作や認証など）を実装できます。
// 主にユーザー操作に応じたサーバー処理に使われます。

// サーバーコンポーネントの関数
// サーバーコンポーネントの関数は、ページの初回表示や静的なデータ取得など、サーバー上でのみ実行されるロジックを記述する場所です。
// これらの関数はクライアントから直接呼び出すことはできず、主にSSR（サーバーサイドレンダリング）やSEO対策、初期データの取得に利用されます。
// ユーザー操作に応じた動的なサーバー処理には向いていません。

// API Route
// API Routeは、Next.jsで独自のAPIエンドポイント（/api/xxx）を作成し、クライアントからfetchやaxiosでリクエストを送る従来の方法です。
// Server Action登場前は、クライアントからサーバー処理を呼び出す際の標準的な手段でした。
// API RouteはNext.js以外のフロントエンドや外部サービスからも利用できる汎用性がありますが、型安全や記述の簡潔さではServer Actionに劣ります。


'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });

    redirect('/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが正しくありません';
        default:
          return 'エラーが発生しました';
      }
    }
    throw error;
  }
}