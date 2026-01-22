
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  // Making children optional resolves "Property 'children' is missing in type '{}'" errors in App.tsx,
  // which can occur when the compiler strictly checks provided props against the interface before JSX processing.
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
// Explicitly using React.Component to ensure the compiler recognizes inherited properties like props and state.
class ErrorBoundary extends React.Component<Props, State> {
  // Explicitly declaring state as a property to fix: Property 'state' does not exist on type 'ErrorBoundary'.
  public state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
    // State is initialized above in the class field to ensure it is visible to the compiler.
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  public render(): ReactNode {
    // Accessing this.state which is now explicitly declared and inherited correctly.
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-950 text-white font-sans text-center relative z-[1000]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-pink-900/10 pointer-events-none"></div>
          
          <div className="relative z-10 glass-container p-8 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl max-w-lg">
            <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Something unexpected happened.</h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
              The application encountered a runtime error. This might be a temporary issue.
            </p>
            
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all duration-300 font-bold shadow-xl shadow-indigo-500/30 active:scale-95 mb-6"
            >
              Restart Application
            </button>

            {this.state.error && (
              <div className="text-left mt-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Error Log</p>
                <pre className="p-4 bg-black/40 border border-white/5 rounded-xl text-[10px] overflow-auto max-h-32 text-indigo-300 scrollbar-hide">
                  {this.state.error.message}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Returning children property; this.props is now correctly recognized due to React.Component inheritance.
    return this.props.children;
  }
}

export default ErrorBoundary;
