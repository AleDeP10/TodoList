package io.todolist.hibernate.type;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.SqlTypes;
import org.hibernate.usertype.UserType;
import org.postgresql.util.PGobject;
import utils.ProfileUtils;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Objects;

public class PostgreSQLEnumType<T extends Enum<T>> implements UserType<T> {

    private static final int SQL_TYPE = SqlTypes.OTHER;

    private final Class<T> enumClass;
    private final String pgEnumTypeName;

    private static final boolean IS_POSTGRES = ProfileUtils.isPostgres();

    public PostgreSQLEnumType(Class<T> enumClass, String pgEnumTypeName) {
        this.enumClass = enumClass;
        this.pgEnumTypeName = pgEnumTypeName;
    }

    @Override
    public int getSqlType() {
        return SQL_TYPE;
    }

    @Override
    public Class<T> returnedClass() {
        return enumClass;
    }

    @Override
    public boolean equals(T x, T y) {
        return Objects.equals(x, y);
    }

    @Override
    public int hashCode(T x) {
        return x.hashCode();
    }

    @Override
    public T nullSafeGet(ResultSet rs, int position, SharedSessionContractImplementor session, Object owner) throws SQLException {
        String value = rs.getString(position);
        if (value == null) {
            return null;
        }
        return Enum.valueOf(enumClass, value);
    }

    @Override
    public void nullSafeSet(PreparedStatement st, T value, int index, SharedSessionContractImplementor session) throws SQLException {
        if (value == null) {
            st.setNull(index, Types.OTHER);
        } else {
            if (IS_POSTGRES) {
                PGobject pgObject = new PGobject();
                pgObject.setType(pgEnumTypeName);
                pgObject.setValue(value.name());
                st.setObject(index, pgObject);
            } else {
                st.setObject(index, value.name());
            }
        }
    }

    @Override
    public T deepCopy(T value) {
        return value;
    }

    @Override
    public boolean isMutable() {
        return false;
    }

    @Override
    public Serializable disassemble(T value) {
        return value;
    }

    @Override
    public T assemble(Serializable cached, Object owner) {
        return (T) cached;
    }

    @Override
    public T replace(T original, T target, Object owner) {
        return original;
    }
}
