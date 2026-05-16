package mate.academy.backend.config;

import com.zaxxer.hikari.HikariDataSource;
import java.net.URI;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class DataSourceConfig {
    private static final String POSTGRES_SCHEME = "postgres";
    private static final String POSTGRESQL_SCHEME = "postgresql";

    @Bean
    public DataSource dataSource(Environment environment) {
        String envDatabaseUrl = System.getenv("DATABASE_URL");
        DatabaseUrl databaseUrl = toJdbcUrl(firstNonBlank(
                envDatabaseUrl,
                environment.getProperty("spring.datasource.url")
        ));

        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(databaseUrl.jdbcUrl());
        dataSource.setUsername(firstNonBlank(
                System.getenv("DATABASE_USERNAME"),
                databaseUrl.username(),
                environment.getProperty("spring.datasource.username")
        ));
        dataSource.setPassword(firstNonBlank(
                System.getenv("DATABASE_PASSWORD"),
                databaseUrl.password(),
                environment.getProperty("spring.datasource.password")
        ));
        return dataSource;
    }

    private DatabaseUrl toJdbcUrl(String rawUrl) {
        if (rawUrl == null || rawUrl.startsWith("jdbc:")) {
            return new DatabaseUrl(rawUrl, null, null);
        }

        URI uri = URI.create(rawUrl);
        String scheme = uri.getScheme();
        if (!POSTGRES_SCHEME.equals(scheme) && !POSTGRESQL_SCHEME.equals(scheme)) {
            return new DatabaseUrl(rawUrl, null, null);
        }

        String jdbcUrl = "jdbc:postgresql://" + uri.getHost()
                + (uri.getPort() == -1 ? "" : ":" + uri.getPort())
                + uri.getPath();

        String query = uri.getRawQuery();
        if (query != null && !query.isBlank()) {
            jdbcUrl += "?" + query;
        }

        String username = null;
        String password = null;
        String userInfo = uri.getUserInfo();
        if (userInfo != null && !userInfo.isBlank()) {
            String[] credentials = userInfo.split(":", 2);
            username = credentials[0];
            if (credentials.length > 1) {
                password = credentials[1];
            }
        }

        return new DatabaseUrl(jdbcUrl, username, password);
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }

    private record DatabaseUrl(String jdbcUrl, String username, String password) {
    }
}
