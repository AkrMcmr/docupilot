import type { Metadata } from "next";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | DocuPilot",
  description: "DocuPilot の特定商取引法に基づく表記です。",
  alternates: {
    canonical: "https://docupilot-alpha.vercel.app/tokusho",
  },
};

const rows: { label: string; value: React.ReactNode }[] = [
  {
    label: "販売業者",
    value: "町村彰",
  },
  {
    label: "運営責任者",
    value: "町村彰",
  },
  {
    label: "所在地",
    value: "請求があり次第、遅滞なく開示いたします。",
  },
  {
    label: "電話番号",
    value: "請求があり次第、遅滞なく開示いたします。",
  },
  {
    label: "メールアドレス",
    value: (
      <a
        href="mailto:machimura.akira@gmail.com"
        className="underline hover:text-zinc-900 dark:hover:text-white"
      >
        machimura.akira@gmail.com
      </a>
    ),
  },
  {
    label: "販売URL",
    value: (
      <a
        href="https://docupilot-alpha.vercel.app"
        className="underline hover:text-zinc-900 dark:hover:text-white"
      >
        https://docupilot-alpha.vercel.app
      </a>
    ),
  },
  {
    label: "販売価格",
    value: (
      <ul className="space-y-1">
        <li>Free プラン：無料（1リポジトリ）</li>
        <li>Starter プラン：月額 $9.00（5リポジトリまで）</li>
        <li>Pro プラン：月額 $29.00（無制限）</li>
        <li className="text-sm text-zinc-500 dark:text-zinc-400">
          ※ 価格は米ドル表示です。請求時のレートにより円換算額が変動することがあります。
        </li>
      </ul>
    ),
  },
  {
    label: "販売価格以外の費用",
    value: "インターネット接続に必要な通信費はお客様のご負担となります。",
  },
  {
    label: "支払方法",
    value: "クレジットカード決済（Visa / Mastercard / American Express / JCB）",
  },
  {
    label: "支払時期",
    value:
      "お申し込み時に初回課金が発生します。以降は毎月同日に自動で更新・課金されます。",
  },
  {
    label: "サービス提供時期",
    value: "決済完了後、即時ご利用いただけます。",
  },
  {
    label: "キャンセル・解約について",
    value:
      "ダッシュボードからいつでも解約できます。解約後は当該請求期間の末日までサービスをご利用いただけます。期間途中での日割り返金は行いません。",
  },
  {
    label: "返金について",
    value:
      "初回ご契約時および各更新日から7日以内にご連絡いただいた場合、全額返金いたします。7日を超えた場合は個別にご相談ください。返金をご希望の場合は machimura.akira@gmail.com までご連絡ください。",
  },
  {
    label: "動作環境",
    value:
      "最新版の Google Chrome / Firefox / Safari / Microsoft Edge。GitHubアカウントおよびDocuPilot GitHub Appのインストールが必要です。",
  },
];

export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">特定商取引法に基づく表記</h1>
        <p className="text-sm text-zinc-500 mb-10">最終更新日：2026年4月4日</p>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-200 dark:border-zinc-800 last:border-0"
                >
                  <th className="w-36 shrink-0 px-5 py-4 text-left font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 align-top">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
