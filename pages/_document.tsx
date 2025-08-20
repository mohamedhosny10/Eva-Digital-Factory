import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* <title>Eva Digital Factory - Digital Transformation Arm</title> */}
        <meta name="description" content="Leading the pharmaceutical industry through innovative digital solutions, AI-powered technologies, and operational excellence." />
        <meta name="generator" content="v0.dev" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
