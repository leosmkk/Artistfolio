import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class RemoteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RemoteErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
            <p className="text-4xl mb-4">⚠️</p>
            <h2 className="text-xl font-display font-bold text-gray-900 mb-2">
              Módulo indisponível
            </h2>
            <p className="text-gray-500 max-w-md mb-6">
              Não foi possível carregar este módulo. Isso pode acontecer se o
              serviço remoto estiver offline ou inacessível.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
            >
              Recarregar página
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
