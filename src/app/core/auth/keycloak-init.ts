import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';

export function initializeKeycloak() {
  return {
    provide: KeycloakService,
    useFactory: () => {
      const keycloakService = new KeycloakService();
      keycloakService.init({
        config: {
          //url: 'https://k8s-lia.unrn.edu.ar/keycloak/realms/videoclub02/protocol/openid-connect/auth?client_id=account-console&redirect_uri=https%3A%2F%2Fk8s-lia.unrn.edu.ar%2Fkeycloak%2Frealms%2Fvideoclub02%2Faccount%2F%23%2Fapplications&state=e1c6e2a8-097d-459c-824b-a0a6613507c7&response_mode=query&response_type=code&scope=openid&nonce=c2b25704-8b51-4511-84f2-69ab7b124389&code_challenge=ABOMIYuLeVYHF1Xdw5K1s2RHFNdSRd2r_3u5SInVUUo&code_challenge_method=S256',
          url: 'https://k8s-lia.unrn.edu.ar/keycloak',
          realm: 'videoclub02',
          clientId: 'angular-client',
        },
        initOptions: {
          onLoad: 'login-required',
          flow: "standard",
          checkLoginIframe: false,
          redirectUri: 'http://localhost:4200/',
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
      });
      return keycloakService;
    },
    deps: [],
  };
}
