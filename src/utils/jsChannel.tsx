declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

const FlutterJsChannel = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html:
          'window.addEventListener("flutterInAppWebViewPlatformReady", function(event) { localStorage.setItem("trash", "webview"); })',
      }}
    />
  );
};

export default FlutterJsChannel;
